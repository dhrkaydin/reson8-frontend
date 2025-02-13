import { useState, useEffect } from 'react';
import { PracticeSessionDTO } from '../../generated/models/PracticeSessionDTO';
import { PracticeRoutineTitleDTO } from '../../generated/models/PracticeRoutineTitleDTO';
import useApi from '../../hooks/useApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatisticsPage: React.FC = () => {
    const [sessions, setSessions] = useState<PracticeSessionDTO[]>([]);
    const [routines, setRoutines] = useState<PracticeRoutineTitleDTO[]>([]);
    const [selectedRoutine, setSelectedRoutine] = useState<number | null>(null);
    const [dateRange, setDateRange] = useState<'7days' | 'month' | 'alltime'>('7days');
    const [metric, setMetric] = useState<'bpm' | 'duration'>('bpm'); // State for selecting metric (bpm or duration)
    
    const { data, error, execute, loading } = useApi<PracticeSessionDTO[]>();
    const { data: routineData, execute: routineExecute } = useApi<PracticeRoutineTitleDTO[]>();

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                await routineExecute('GET', '/routines/titles');
                if (routineData) {
                    setRoutines(routineData);
                }
            } catch (err) {
                console.error("Couldn't fetch routines", err);
            }
        };

        fetchRoutines();
    }, []);

    useEffect(() => {
        if (routineData) {
            setRoutines(routineData); 
        }
    }, [routineData])

    const getDateRange = () => {
        const today = new Date();
        let startDate: string;
        switch (dateRange) {
            case '7days':
                today.setDate(today.getDate() - 7);
                startDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                break;
            case 'month':
                today.setMonth(today.getMonth() - 1);
                startDate = today.toISOString().split('T')[0];
                break;
            case 'alltime':
                startDate = '2000-01-01'; // TODO: ideally this will be the date of the first session ever
                break;
            default:
                startDate = '2000-01-01';
        }
        return startDate;
    };

    useEffect(() => {
        const fetchData = async () => {
            const startDate = getDateRange();
            const endDate = new Date().toISOString().split('T')[0];

            try {
                const url = `/sessions?startDate=${startDate}&endDate=${endDate}${selectedRoutine ? `&routineId=${selectedRoutine}` : ''}`;
                await execute('GET', url);
            } catch (err) {
                console.error("Couldn't fetch sessions", err);
            }
        };

        fetchData();
    }, [dateRange, selectedRoutine, execute]);

    useEffect(() => {
        if (data) {
            setSessions(data);
        }
    }, [data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading sessions: {error}</div>;

    // Format data for Recharts
    const chartData = sessions.map((session) => ({
        date: new Date(session.sessionDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }),
        bpm: session.bpm,
        duration: session.duration / 60,
    }));

    return (
        <div className="flex flex-col flex-1 bg-resonPurple sm:px-4 py-2 sm:p-6">
            {/* Filters container */}
            <div className="sticky top-0 flex flex-col sm:flex-row w-full items-center justify-center gap-4 sm:gap-10 sm:px-36 p-5 bg-resonPurple">
                {/* Date Range */}
                <div className="relative">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value as '7days' | 'month' | 'alltime')}
                        className="bg-resonGreen h-10 w-52 text-black text-2xl text-center font-pixelify px-4 py-0 border appearance-none cursor-pointer focus:outline-none"
                    >
                        <option value="7days">past 7 days</option>
                        <option value="month">past month</option>
                        <option value="alltime">all time</option>
                    </select>
                    <div className="absolute inset-y-0 right-2 text-2xl flex justify-center items-center pointer-events-none">⌄</div>
                </div>
                {/* Routine Filter */}     
                <div className="relative">
                    <select
                        value={selectedRoutine ?? ''}
                        onChange={(e) => setSelectedRoutine(Number(e.target.value))}
                        className="bg-resonGreen h-10 w-auto text-black text-2xl text-center font-pixelify px-4 py-0 border appearance-none cursor-pointer focus:outline-none"
                    >
                        <option value="">all routines</option>
                        {routines.map((routine) => (
                            <option key={routine.id} value={routine.id}>
                                {routine.title}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-2 text-2xl flex justify-center items-center pointer-events-none">⌄</div>
                </div>    
                {/* BPM or Duration Selector */} 
                <div className="relative">
                    <select
                        value={metric}
                        onChange={(e) => setMetric(e.target.value as 'bpm' | 'duration')}
                        className="bg-resonGreen h-10 w-52 text-black text-2xl text-center font-pixelify px-4 py-0 border appearance-none cursor-pointer focus:outline-none"
                    >
                        <option value="bpm">BPM</option>
                        <option value="duration">duration</option>
                    </select>
                    <div className="absolute inset-y-0 right-2 text-2xl flex justify-center items-center pointer-events-none">⌄</div>
                </div>
            </div>

            {/* Chart */}
            <div className="mb-6 px-5 flex-grow font-silkscreen flex justify-center items-center">
                <ResponsiveContainer width="95%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d562ac" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: "#000000", fontSize: 14 }}
                            axisLine={{ stroke: "#000000", strokeWidth: 2 }}
                        />
                        <YAxis
                            tick={{ fill: "#000000", fontSize: 14 }}
                            axisLine={{ stroke: "#000000", strokeWidth: 2 }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey={metric} stroke={"#94ffd8"} strokeWidth="4" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatisticsPage;