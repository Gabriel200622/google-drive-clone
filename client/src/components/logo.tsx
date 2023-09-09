import { FaDatabase } from "react-icons/fa";

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <FaDatabase className="text-3xl text-primary" />

            <span className="font-semibold text-lg text-primary">BigDrive</span>
        </div>
    );
};

export default Logo;
