import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';

export default function AdminChart({ data }) {
    return (
        <div className="bg-bg-card p-6 rounded-2xl border border-border-color shadow-sm mt-8 sm:overflow-x-auto">
            <div className='flex items-center justify-between'>
                <h3 className="text-lg font-bold text-text-primary mb-4">Revenue Overview</h3>
                <button className="bg-accent text-accent-text text-xs px-4 py-1.5 rounded-full font-medium shadow-sm">
                    7 Days
                </button>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%" className={'sm:overflow-x-auto'}>
                    <BarChart data={data}>
                        {/* Background grid lines styled with subtle theme color */}
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-bg-subtle)" />

                        {/* Days on the X-Axis */}
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                        />

                        {/* Revenue on the Y-Axis */}
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                            tickFormatter={(value) => `$${value}`}
                        />

                        {/* Hover Tooltip styled with theme primary text & accent background */}
                        <Tooltip
                            formatter={(value) => [`$${value}`, 'Revenue']}
                            contentStyle={{
                                backgroundColor: 'var(--color-accent-main)',
                                borderRadius: '8px',
                                color: 'var(--color-accent-text)',
                                border: 'none'
                            }}
                        />

                        {/* Bar styled with your #ff6b00 accent color */}
                        <Bar
                            dataKey="revenue"
                            fill="var(--color-accent)"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}