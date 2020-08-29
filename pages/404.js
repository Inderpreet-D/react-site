import Link from "next/link";

const Custom404 = () => {
    return (
        <div>
            <h3>Page Not Found</h3>
            <Link href="/" replace>
                <a>Go back home</a>
            </Link>
        </div>
    );
};

export default Custom404;
