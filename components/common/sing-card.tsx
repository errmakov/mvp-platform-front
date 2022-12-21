import Link from 'next/link';
import styles from '../../styles/Home.module.css'
interface Props {
    isSigned: boolean;
  }

export default function SignCard(props: Props) {
    if (props.isSigned) {
        return  (
    
            <Link
                href="/api/signout"
                className={styles.card}
              >
                <h2 >
                  Sign out <span>-&gt;</span>
                </h2>
                <p className={styles.className}>
                  I'm done.
                </p>
              </Link>
      )
    } else { return  (
    
        <Link
            href="/api/signin"
            className={styles.card}
            
          >
            <h2 >
              Sign in <span>-&gt;</span>
            </h2>
            <p className={styles.className}>
              Let me in.
            </p>
          </Link>
  )}
}