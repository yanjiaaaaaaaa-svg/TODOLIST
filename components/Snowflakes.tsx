import React, { useEffect, useState } from 'react';

const Snowflakes: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; symbol: string }>>([]);

  useEffect(() => {
    // 雪花符号数组
    const snowflakeSymbols = ['❄', '❅', '❆', '✻', '✼', '❉'];

    // 生成雪花数据
    const generateSnowflakes = () => {
      return Array.from({ length: 18 }, (_, i) => ({
        id: i,
        symbol: snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)]
      }));
    };

    setSnowflakes(generateSnowflakes());
  }, []);

  return (
    <div className="snowflakes">
      {snowflakes.map((snowflake) => (
        <div key={snowflake.id} className="snowflake">
          {snowflake.symbol}
        </div>
      ))}
    </div>
  );
};

export default Snowflakes;