import React from 'react';

import Head from './Head';
import Body from './Body';
import Footer from './Footer';
import {Link} from 'react-router';

const Main = () => (
  <div>
    <Head
      name="React router transitions"
      description="Brings transitions to react-router"
    >
      <a className="btn" href="https://github.com/doctolib/react-router-transitions">
        View on GitHub
      </a>
    </Head>
    <Body>
      For now we don't have much to show, only:
      <ul>
        <li><Link to="/transition-group">An implementation example of the low level TransitionGroup</Link></li>
        <li><Link to="/react-router-transitions">A simple demo</Link></li>
      </ul>
      <Footer
        maintainerName="doctolib"
        maintainerUrl="https://github.com/doctolib"
        repositoryName="react-router-transitions"
        repositoryUrl="https://github.com/doctolib/react-router-transitions"
      />
    </Body>
  </div>
);

export default Main;
