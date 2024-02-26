'use client'
import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {ROUTES} from '_constants/index';

import { NextRouter } from 'next/router';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

// const headerStyles = {
//   // padding: 18,
//   // fontSize: 16,
//   // height: 56,
//   // background: '#34c3ff',
//   // color: ' #fff',
//   // whiteSpace: 'nowrap',
//   // overflow: 'hidden'
// };

// interface NavToggleProps {
//   expand: boolean;
//   onChange: () => void;
// }

// const NavToggle: React.FC<NavToggleProps> = ({ expand, onChange }) => {
//   return (
//     <Navbar appearance="subtle" className="nav-toggle">
//       <Nav pullRight>
//         <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
//           {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
//         </Nav.Item>
//       </Nav>
//     </Navbar>
//   );
// };

const App = ({ children }: { children: React.ReactNode }) => {
  // const [expand, setExpand] = React.useState(true);

  const pathname = usePathname();

  return (
    // <div className=" ">
    <Container style={{ display: 'flex', flexDirection: 'row' }}>
      <Container style={{ flex: '5%' }}>
        <Sidebar style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--rs-sidenav-default-bg)' }}>
          <Sidenav.Header>
            <div className='p-3 d-flex justify-content-center align-center'>
              <Image src="/logo.png" alt="Picture of the author" width={50} height={50} />
              <h3><b>FEATUREVISOR</b></h3>
              {/* <Image src="/logo_text" alt="Picture of the author" width={50} height={50} /> */}
            </div>
          </Sidenav.Header>
          <Sidenav.Body>
            <Sidenav  >
              <Sidenav.Body>
                <Nav activeKey={pathname} >
                  <Nav.Item eventKey={ROUTES.ATTRIBUTES} as={Link} href={ROUTES.ATTRIBUTES} >
                    Attributes
                  </Nav.Item>
                  <Nav.Item eventKey={ROUTES.SEGMENTS} as={Link} href={ROUTES.SEGMENTS}>
                    Segments
                  </Nav.Item>
                  <Nav.Item eventKey={ROUTES.FEATURES} as={Link} href={ROUTES.FEATURES}>
                    Features
                  </Nav.Item>
                  <Nav.Item eventKey={ROUTES.GROUPS} as={Link} href={ROUTES.GROUPS}>
                    Groups
                  </Nav.Item>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidenav.Body>
        </Sidebar>
      </Container>

      <Container style={{ flex: '95%' }}>
        <Header>
          {/* <h2>Page Title</h2> */}
        </Header>
        <Content>
          {children}
        </Content>
      </Container>
    </Container>
    // </div>
  );
};

export default App;