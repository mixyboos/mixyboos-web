import React from 'react';
import { redirect } from 'next/dist/next-server/server/api-utils';

export const withAuth = C => {
  class AuthComponent extends React.Component {
    static async getInitialProps(ctx) {
      const response = await ctx.apolloClient.query({ query: ME });
      console.log('@withAuth ', response);

      if (!response || !response.data || !response.data.me) {
        redirect(ctx, '/');
        return {
          me: null
        };
      }

      // Get component’s props
      let componentProps = {};
      if (C.getInitialProps) {
        componentProps = await C.getInitialProps(ctx);
      }

      return {
        me: response.data.me,
        ...componentProps
      };
    }

    render() {
      return <C {...this.props} />;
    }
  }

  return AuthComponent;
};
