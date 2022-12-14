import ProForm, { ProFormUploadDragger } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, message, Radio } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { fakeSubmitForm } from './service';

const UploadWings: FC<Record<string, any>> = () => {
  const formRef = useRef<any>();
  const [single, setSingle] = useState('single');
  const sendRequest = async (data: any) => {
    const hide = message.loading('正在上传...', 50);
    fakeSubmitForm(data)
      .then((res: any) => {
        hide();
        if (res.errno === 200) {
          message.success('上传成功！');
          formRef.current.resetFields();
        }
      })
      .catch((res) => {
        message.error(res);
      });
  };

  const onFinish = async (values: Record<string, any>) => {
    const { files } = values;
    console.log(files);
    const imgArr: string[] = [];
    const jsonArr: string[] = [];
    console.log(files);
    if (!files || files.length === 0) {
      message.warn('请选择翅膀文件');
      return;
    }
    let typeError = false;
    files.forEach((item: any) => {
      if (!(item.type.includes('image') || item.type.includes('json'))) {
        typeError = true;
      }
      if (item.type.includes('image')) {
        imgArr.push(item.name.replace(/(.*\/)*([^.]+).*/gi, '$2'));
      }
      if (item.type.includes('json')) {
        jsonArr.push(item.name.replace(/(.*\/)*([^.]+).*/gi, '$2'));
      }
    });
    if (typeError) {
      message.error('文件格式错误，请重新上传');
      return;
    }
    if (!imgArr.length || !jsonArr.length) {
      message.error('请至少选择一个图片和一个json文件!');
      return;
    }
    if (imgArr.length !== jsonArr.length) {
      message.error('图片与json文件需要数量一致;一一对应');
      return;
    }
    let count = 0;
    imgArr.forEach((item) => {
      jsonArr.forEach((json) => {
        if (item === json) {
          count++;
        }
      });
    });
    if (count !== imgArr.length || count !== jsonArr.length) {
      message.error('图片名与json文件名需要一致;一一对应');
      return;
    }
    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append('file', file.originFileObj);
    });
    sendRequest(formData);
  };
  const onChangeRadio = (e: any) => {
    setSingle(e.target?.value || 'single');
  };
  return (
    <PageContainer content="该页面用于设计师上传制作好的翅膀作品(需要example.png + example.json)">
      <Card bordered={false}>
        <Radio.Group
          defaultValue={single}
          buttonStyle="solid"
          size="large"
          onChange={onChangeRadio}
        >
          <Radio.Button value="single">逐一选择文件上传</Radio.Button>
          <Radio.Button value="multiple">选择上传文件夹</Radio.Button>
        </Radio.Group>
        <ProForm
          hideRequiredMark
          style={{ margin: 'auto', marginTop: 12, width: '100%', height: 'calc(100vh - 330px)' }}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          formRef={formRef}
          encType="application/json; charset=UTF-8"
        >
          <ProFormUploadDragger
            name="files"
            title="单击或拖动文件到此区域进行上传"
            description={
              single === 'single'
                ? '支持JPG、PNG、JPEG、SVG、WebP等图片格式文件和json文件'
                : '请选择文件夹(自动过滤掉非图片、json文件)'
            }
            fieldProps={{
              directory: single !== 'single',
              accept: 'image/*,.json',
              multiple: true,
              beforeUpload: () => {
                return false;
              },
            }}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default UploadWings;
