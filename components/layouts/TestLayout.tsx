// Create a custom layout component.
const TestLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="test-container">
        {children}
    </div>;
}

export default TestLayout;