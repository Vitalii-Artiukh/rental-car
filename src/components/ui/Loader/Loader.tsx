import { ProgressBar, ProgressBarProps } from 'react-loader-spinner';
import { FC } from 'react';

const Loader: FC<ProgressBarProps> = () => {
  return (
    <div>
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        barColor="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    </div>
  );
};

export default Loader;
