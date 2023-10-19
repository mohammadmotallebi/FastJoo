import React, {ReactNode} from 'react';
import Layout from '@components/Layout';

interface LayoutProps {
    children: ReactNode;
}
const IndexPageLayout = ({ children }: LayoutProps) => {
    return <Layout>{children}</Layout>;
};

export default IndexPageLayout;
