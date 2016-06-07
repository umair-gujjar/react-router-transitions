import React from 'react';

import Head from './Head';
import Body from './Body';
import Footer from './Footer';

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
      Body
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
