import React from 'react'
import Sidebar from './Sidebar'
import Panel from './Panel'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
`

const Header = styled.header`
  background-color: rgb(40, 40, 50);
`

const User: React.FC = () =>
  <Wrapper className="row">
    <Header className="col-auto">
      <Sidebar />
    </Header>
    <main className="col">
      <div className="pt-5 px-5">
        <Panel />
      </div>
    </main>
  </Wrapper>

export default User