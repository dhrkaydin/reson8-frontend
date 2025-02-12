import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col sm:flex-row flex-grow">
            <Link to="/sessions" className='flex-1'>
                <div className="flex flex-1 h-full items-center justify-center text-center font-silkscreen text-5xl sm:text-[60px] text-[#737458] bg-resonGreen">
                    Start Session
                </div>
            </Link>
            <Link to="/routines" className='flex-1'>
                <div className="flex flex-1 h-full items-center justify-center text-center font-silkscreen text-5xl sm:text-[60px] text-[#75C1A5] bg-resonYellow">
                    View Routines
                </div>
            </Link>
        </div>
    );
};

export default HomePage;