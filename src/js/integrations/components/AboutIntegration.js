import React from 'react';
import Card from 'theme-claire/src/atoms/Card';

export default ({ item }) => (
  <Card>
    <h2>About {item.name}</h2>
    <p>
      {item.shortDescription}
    </p>
  </Card>
);
