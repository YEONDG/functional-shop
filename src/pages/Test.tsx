import * as React from 'react';

import MyComponent from '../components/test/MyComponent';
import { MyFormData } from '../components/test/FormData';

export default function Test() {
  const [data, setData] = React.useState<any>({
    myfield: [], // 초기값을 MyFormData 타입에 맞게 설정
  });

  console.log(data, '데이터를 확인하겠습니다. 우와와와아오와와왕와아');

  const onFormDataUpdated = (updated: MyFormData) => {
    setData((prevData: MyFormData) => {
      // 실제로 변경된 경우에만 state 업데이트
      const currentStr = JSON.stringify(prevData);
      const updatedStr = JSON.stringify(updated);

      if (currentStr !== updatedStr) {
        console.log('실제 변경 감지, 업데이트:', updated);
        return updated;
      } else {
        console.log('동일한 데이터, 업데이트 스킵');
        return prevData;
      }
    });
  };

  return (
    <div>
      <MyComponent model={data} onUpdate={onFormDataUpdated} />
    </div>
  );
}
