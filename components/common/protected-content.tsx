import Link from 'next/link'


interface Props {
    isSigned: boolean
  }

export default function ProtectedContent(props: Props) {
    if (!props.isSigned) {
        return (
            <>
                <p>Sorry, you are not allowed for that protected content. You'd better <Link href="/api/signin">sign in</Link></p>
            </>
        )
    }
    else {
        return (
            <>
                <p>
                    <b>Some protected content goes here</b>
                </p>
                
            </>
        )
    }
}