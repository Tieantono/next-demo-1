import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

// <> = generic type parameter.
// Generic type parameter = special syntax in TS to pass type definition as parameters.
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
}