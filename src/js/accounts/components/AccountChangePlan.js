import React, { Component } from 'react';
import { StripeProvider, Elements, injectStripe, CardElement } from 'react-stripe-elements';
import { branch, renderComponent, compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import loader from 'clarity/dist/loader';
import { FETCHING } from 'clarity/dist/constants/state';
import Loading from 'theme-claire/src/atoms/Loading';
import Button from 'theme-claire/src/atoms/Button';
import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Input from 'theme-claire/src/atoms/Input';
import ErrorBlock from 'theme-claire/src/atoms/ErrorBlock';
import InputError from 'theme-claire/src/atoms/InputError';
import FormActions from 'theme-claire/src/atoms/FormActions';

import { refresh, setTrial } from 'js/auth/actions';
import { getMe } from 'js/me/actions';
import LoadStripe from './stripe/LoadStripe';
import { get, update } from '../actions/billing';
import { get as getPlans } from '../actions/plans';

const withToggle = compose(
  withState('focused', 'toggle', false),
  withHandlers({
    focus: ({ toggle }) => (e) => toggle(true),
    blur: ({ toggle }) => (e) => toggle(false),
    toggle: ({ toggle }) => (e) => toggle((current) => !current),
  })
);

const Card = withToggle(({ onChange, focused, focus, blur }) => {
  const options = {
    hidePostalCode: true,
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#8898AA',
        color: '#444',
        lineHeight: '36px',
        fontWeight: '300',
        fontFamily: 'Roboto, Helvetica, sans-serif',
        fontSize: '16px',

        '::placeholder': {
          color: '#8898AA',
          fontWeight: '300',
        },
      },
      invalid: {
        iconColor: '#DD2476',
        color: '#DD2476',
      },
    },
    classes: {
      focus: 'is-focused',
      empty: 'is-empty',
    },
  };

  return (
    <div className={`stripe-element ${focused ? 'stripe-element--focused' : 'stripe-element--blurred'}`}>
      <CardElement {...options}
        onChange={onChange}
        onFocus={focus}
        onBlur={blur}
      />
    </div>
  );
});

class AccountChangePlan extends Component {
  static defaultProps = {
    addressLineOne: '',
    addressLineTwo: '',
    region: '',
    city: '',
    postalCode: '',
  }

  state = {
    error: null,
    errors: {},
    isCardDirty: false,
  }

  handleCardChange = (event) => {
    this.setState({
      isCardDirty: event.complete,
    });
  }

  validateForm = () => {
    const { isCardDirty } = this.state;
    const {
      addressLineOne,
      region,
      city,
      postalCode,
    } = this.props;

    const nextAddressLineOne = this.form.addressLineOne.value;
    const nextRegion = this.form.region.value;
    const nextCity = this.form.city.value;
    const nextPostalCode = this.form.postalCode.value;

    const errors = {};

    if (isCardDirty ||
      addressLineOne !== nextAddressLineOne ||
      region !== nextRegion ||
      city !== nextCity ||
      postalCode !== nextPostalCode) {
      if (nextAddressLineOne.trim() === '') {
        errors.addressLineOne = 'Street Address is required';
      }
      if (nextCity.trim() === '') {
        errors.city = 'City is required';
      }
      if (nextRegion.trim() === '') {
        errors.region = 'State, Province, or Region is required';
      }
      if (nextPostalCode.trim() === '') {
        errors.postalCode = 'Postal Code is required';
      }
    }

    this.setState({ errors });

    return Object.keys(errors).length !== 0;
  }

  handleSubmit = (event) => {
    const {
      name,
      email,
      billing,
      stripe,

      addressLineOne,
      addressLineTwo,
      city,
      region,
      postalCode,
    } = this.props;
    const { isCardDirty, waiting } = this.state;

    event.preventDefault();

    if (this.validateForm()) {
      return;
    }

    if (waiting) {
      return;
    }

    this.setState({
      waiting: true,
    });

    const nextPlan = this.form.plan.value;
    const nextAddressLineOne = this.form.addressLineOne.value;
    const nextAddressLineTwo = this.form.addressLineTwo.value;
    const nextRegion = this.form.region.value;
    const nextCity = this.form.city.value;
    const nextPostalCode = this.form.postalCode.value;

    const changes = {};

    if (addressLineOne !== nextAddressLineOne ||
      region !== nextRegion ||
      city !== nextCity ||
      postalCode !== nextPostalCode) {
      changes.addressLineOne = nextAddressLineOne;
      changes.addressLineTwo = nextAddressLineTwo;
      changes.city = nextCity;
      changes.region = nextRegion;
      changes.postalCode = nextPostalCode;
    }

    if (nextPlan !== billing.plan) {
      changes.plan = nextPlan;
    }

    if (isCardDirty) {
      const options = {
        type: 'card',
        name,
        email,
        address_line1: nextAddressLineOne || addressLineOne,
        address_line2: nextAddressLineTwo || addressLineTwo,
        address_city: nextCity || city,
        address_state: nextRegion || region,
        address_zip: nextPostalCode || postalCode,
      };

      stripe.createToken(options).then(({ token }) => {
        changes.stripeToken = token.id;
        changes.addressLineOne = nextAddressLineOne;
        changes.addressLineTwo = nextAddressLineTwo;
        changes.city = nextCity;
        changes.region = nextRegion;
        changes.postalCode = nextPostalCode;

        this.makeChanges(changes);
      });
    } else {
      if (Object.keys(changes).length === 0) {
        this.setState({
          waiting: false,
          error: 'You must make a change to update your plan and billing information',
        });
        return;
      }

      this.makeChanges(changes);
    }
  }

  makeChanges = (changes) => {
    const { close, update, refresh, handleSetTrial, onChangeDirty } = this.props;

    this.clarityRequest = update(changes);
    this.clarityRequest.response.then(({ res, body }) => {
      // refresh token
      this.clarityRefreshRequest = refresh();
      this.clarityRefreshRequest.response
        .then(() => {
          // set new trial state
          const trialInfo = {
            status: body.plan,
            trialIsExpired: false,
          };
          handleSetTrial(trialInfo);
          onChangeDirty(false);
          close();
          this.setState({
            waiting: false,
          });
        })
        .catch((err) => {
          this.setState({
            error: err.reason,
            waiting: false,
          });
        });
    }).catch((err) => {
      this.setState({
        error: err.reason,
        waiting: false,
      });
    });
  }

  render() {
    const { billing, plans, error: propError } = this.props;
    const { error, errors } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        ref={r => (this.form = r)}
      >
        <h2>Change Your Plan and Billing</h2>

        <h3>Your Plan</h3>

        <select name="plan">
          {Object.values(plans.items).map(plan => (
            <option
              value={plan.id}
              selected={plan.id === billing.plan}
            >{plan.name}</option>
          ))}
        </select>

        <h3>Payment Information</h3>

        <Card onChange={this.handleCardChange} />

        <FormGroup>
          <InputError>{errors.addressLineOne || ''}</InputError>
          <Input
            defaultValue={billing.addressLineOne}
            label="Street Address"
            type="text"
            name="addressLineOne"
          />
        </FormGroup>

        <FormGroup>
          <InputError>{errors.addressLineTwo || ''}</InputError>
          <Input
            defaultValue={billing.addressLineTwo}
            label="Apartment, building, number, etc"
            type="text"
            name="addressLineTwo"
          />
        </FormGroup>

        <FormGroup>
          <InputError>{errors.city || ''}</InputError>
          <Input
            defaultValue={billing.city}
            label="City"
            type="text"
            name="city"
          />
        </FormGroup>

        <FormGroup>
          <InputError>{errors.region || ''}</InputError>
          <Input
            defaultValue={billing.region}
            label="State, Province, or Region"
            type="text"
            name="region"
          />
        </FormGroup>

        <FormGroup>
          <InputError>{errors.postalCode || ''}</InputError>
          <Input
            defaultValue={billing.postalCode}
            label="Postal Code"
            type="text"
            name="postalCode"
          />
        </FormGroup>

        <ErrorBlock>{error || propError}</ErrorBlock>

        <FormActions>
          <Button primary type="submit">Update</Button>
        </FormActions>
      </form>
    );
  }
}

const enhanceError = branch(
  props => props.billing.state !== FETCHING && props.plans.state !== FETCHING && (props.plans === null || typeof props.plans === 'undefined'),
  renderComponent(({error}) => <ErrorBlock>{error}</ErrorBlock>)
);

const enhance = branch(
  props => props.billing.state === FETCHING || props.plans.state === FETCHING,
  renderComponent(Loading)
);

const Injected = injectStripe(enhance(enhanceError(AccountChangePlan)));

const Wrapper = (props) => (
  <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
    <Elements>
      <Injected {...props} />
    </Elements>
  </StripeProvider>
);

export default bind(
  loader(get)(),
  loader(getPlans)(),
  loader(getMe)(),
  connect(
    state => ({
      billing: state.billing,
      error: state.billing.error,
      plans: state.plans,
      name: state.me.name,
      email: state.me.email,
    }),
    {
      update,
      refresh,
      handleSetTrial: (args) => setTrial(args),
    }
  )
)((props) => (<LoadStripe><Wrapper {...props} /></LoadStripe>));
