import NextLink from "next/link"
import { Link as RadixLink } from "@radix-ui/themes"

interface Props {
    href: string
    children: String
}

const Link = ({ href, children }: Props) => {
    return (
        <NextLink href={href} passHref legacyBehavior>
            <RadixLink href={href}>
                {children}
            </RadixLink>
        </NextLink>
    )
}

export default Link