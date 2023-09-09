import Link from "next/link";
import { Button } from "@bigcomponents/core";

const Home = () => {
    return (
        <div className="flex flex-col items-center gap-5">
            <h1 className="text-gray-800 dark:text-white font-bold text-3xl text-center mt-10">
                Easy and secure access to your content
            </h1>

            <Button variant="outline" asChild>
                <Link href="/drive">Go to Drive</Link>
            </Button>
        </div>
    );
};

export default Home;
