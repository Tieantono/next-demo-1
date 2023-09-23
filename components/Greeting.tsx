import React from 'react';

// React Functional Component usually defined as
// an arrow function.
const Greeting: React.FC = () => {
    return <p>Hello World!</p>;
}

// Export Greeting function definition.
// There are 2 different export types:
// - Default
// - Non-default
export default Greeting;

export const AppDescription: React.FC = () => {
    return <p>This is Next.js demo for AEDU workshop.</p>;
}
