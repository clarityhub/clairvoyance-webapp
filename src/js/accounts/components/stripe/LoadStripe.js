import React, { Component } from 'react';
import Loading from 'theme-claire/src/atoms/Loading';

/**
 * Load in the Stripe script if it is not already loaded.
 * 
 * Will present a Loader until Stripe is ready.
 * 
 * ```
 * <LoadStripe>
 *   <MyComponentThatNeedsStripe />>
 * </LoadStripe>
 * ```
 */
export default class LoadStripe extends Component {
  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        loaded: true,
      });

      return;
    }

    const src = document.createElement('script');
    const head = document.head || document.getElementsByTagName('head')[0];
    src.src = 'https://js.stripe.com/v3/';
    src.async = false;
    src.onload = () => {
      this.setState({
        loaded: true,
      });
    };

    head.insertBefore(src, head.firstChild);
  }

  render() {
    const { children } = this.props;
    const { loaded } = this.state;

    if (!loaded) {
      return (
        <Loading />
      );
    } else {
      return <div>{children}</div>;
    }
  }
}
