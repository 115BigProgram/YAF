import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./common/header";
import Home from "./pages/home";
import Detail from "./pages/detail/loadable.js";
import LoginPopup from "./common/loginpopup"
import Login from "./pages/login";
import Write from "./pages/write";
import store from "./store";
import 'antd/dist/antd.css';
import { ContentContainer, MainContainer, TopNavBarContainer } from "./style";
import ArticleBrowser from "./pages/detail/components/articlebrowser"
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <div>
              <TopNavBarContainer>
                <Header />
              </TopNavBarContainer>
              <div>
                <MainContainer>
                  <ContentContainer>
                    <ArticleBrowser></ArticleBrowser>
                    <LoginPopup />
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/write" exact component={Write} />
                    <Route path="/detail/:id" exact component={Detail} />
                  </ContentContainer>
                </MainContainer>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
