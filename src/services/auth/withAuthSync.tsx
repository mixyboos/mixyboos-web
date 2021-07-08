import React from 'react'

interface WithLoadingProps {
  loading: boolean
}

const withAuth = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P & WithLoadingProps> {
    render() {
      const { loading, ...props } = this.props
      return loading ? <div>Hello Sailor</div> : <Component {...(props as P)} />
    }
  }
export default withAuth
