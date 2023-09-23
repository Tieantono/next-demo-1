import { NextPageWithLayout } from "@/components/layouts/NextPageWithLayout";
import TestLayout from "@/components/layouts/TestLayout";
import { ReactElement } from "react";

const Test: React.FC = () => {
    return <div>
        <p>This is a test page.</p>
    </div>;
}

const TestPage: NextPageWithLayout = () => {
    return <Test />;
}

TestPage.getLayout = function (page: ReactElement) {
    return (<TestLayout>
        {page}
    </TestLayout>);
}

export default TestPage;