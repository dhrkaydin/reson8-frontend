import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div className="grid sm:grid-cols-2 grid-cols-1 h-full">
            <Link to="/sessions">
                <div className="flex items-center justify-center h-full text-center font-silkscreen text-5xl sm:text-[110px] text-[#737458] bg-resonGreen">
                    Start Session
                </div>
            </Link>
            <Link to="/routines">
                <div className="flex items-center justify-center h-full text-center font-silkscreen text-5xl sm:text-[110px] text-[#75C1A5] bg-resonYellow">
                    View Routines
                </div>
            </Link>
        </div>
    );
};

export default HomePage;