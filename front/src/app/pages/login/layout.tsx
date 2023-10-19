import React, {ReactNode} from 'react';
import Layout from '../../components/Layout';

interface LayoutProps {
    children: ReactNode;
}
const LoginPageLayout = ({ children }: LayoutProps) => {
    return <Layout>{children}</Layout>;
};

export default LoginPageLayout;