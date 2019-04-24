import { Component } from 'react'

// https://blog.logrocket.com/advanced-react-router-concepts-code-splitting-animated-transitions-scroll-restoration-recursive-17096c0cf9db
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    // Note: we can't compare the location object, since it changes when the anchor change
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default ScrollToTop
