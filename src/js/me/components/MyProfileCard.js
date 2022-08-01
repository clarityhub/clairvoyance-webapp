import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import { branch, renderComponent } from 'recompose';
import loader from 'clarity/dist/loader';
import { FETCHING } from 'clarity/dist/constants/state';

import { get as getAccount } from 'js/accounts/actions';
import { getMe } from '../actions';
import ProfileCard from '../../profiles/components/ProfileCard';
import LoadingProfileCard from '../../profiles/components/LoadingProfileCard';
import { myProfileCard, myProfileCardDropdown } from './MyProfileCard.scss';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import { Dropdown } from 'theme-claire/src/atoms/Portals';
import ProfileMenu from '../../me/components/ProfileMenu';

class MyProfileCard extends React.Component {
  render() {
    const { ...me } = this.props;

    return (
      <div className={myProfileCard}>
        <Dropdown
          overlay={<ProfileMenu />}
        >
          <ProfileCard {...me} />
          <div className={myProfileCardDropdown}>
            <FaAngleDown />
          </div>
        </Dropdown>
      </div>
    );
  }
}

const LoadingMyProfileCard = () => (
  <div className={myProfileCard}>
    <LoadingProfileCard />
  </div>
);

const enhance = branch(
  props => props.state === FETCHING && props.name === '',
  renderComponent(LoadingMyProfileCard),
);

export default bind(
  loader(getAccount)(),
  loader(getMe)(),
  connect(
    state => ({
      ...state.me,
      company: state.accounts.name,
    }),
  )
)(enhance(MyProfileCard));
