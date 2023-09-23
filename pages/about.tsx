import CustomLayout from "@/components/layouts/CustomLayout";
import { NextPageWithLayout } from "@/components/layouts/NextPageWithLayout";
import { ReactElement } from "react";

// Create the page's content component.
const About: React.FC = () => {
    return <div>
        <h1>About</h1>
        <p>Accelist Edukasi Indonesia (AEDU) is training company.</p>
    </div>;
}

// Create a page component which return / render its content.
const AboutPage: NextPageWithLayout = () => {
    return <About />;
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <CustomLayout>
            {page}
        </CustomLayout>
    )
}

// In Next.js, to create a page, you must export default the page component.
export default AboutPage;