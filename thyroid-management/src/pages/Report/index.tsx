import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import './index.less';
import look from '@/assets/images/look.png';
import { history } from 'umi';
// import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
// import { ImageUploader, Space, Toast, Dialog } from 'antd-mobile'
// import { Upload } from 'antd';
import { Toast, ImagePicker } from 'antd-mobile';
import gland from '@/api/gland';
const Report = () => {
  const [disabled, setDisabled] = useState(false);
  const [filed, setFileList] = useState([]) as any;
  const [item, setItem] = useState() as any;
  useEffect(() => {
    if (filed.length == 1) {
      setDisabled(true);
    }
  }, [filed, item]);
  // const onChange = ({ fileList: newFileList }: any) => {
  //   setFileList(newFileList);
  // };
  const onChange = (files: any) => {
    setFileList(files);
    setItem(files);
  };
  const uploadInvoice = (index: any, item: any) => {
    setItem(item);
  };
  //    提交报告

  const handleNext = () => {
    const fd = new FormData();
    filed.map((v: any, i: any) => {
      fd.append('files', v.file);
    });
    Toast.loading('报告解析中...', 0);
    gland.upload(fd).then((res: any) => {
      localStorage.setItem('data', JSON.stringify(res.data));
      localStorage.setItem('url', JSON.stringify(res.data.url));
      Toast.hide();
      if (res.statusCode === 60001) {
        Toast.info(res.message, 2, () => {
          history.push({ pathname: '/thyroid-gland/Write' });
        });
      } else {
        history.push({ pathname: '/thyroid-gland/Write' });
      }
    });
  };
  // 去填写报告
  const handwrite = () => {
    history.push('/thyroid-gland/Write');
    localStorage.removeItem('url');
  };
  return (
    <Page title="甲列腺管理" showNav showBack>
      <div className="report">
        <div className="report-content">
          <div className="report-content-top">
            <div className="report-content-top-title">
              上传您的相关化验单图片，我们将为您解析
            </div>
            <div className="report-content-top-title">
              <span>化验结果</span>
              {/* <span className="look">
                查看示例
                <img src={look} alt="" />
              </span> */}
            </div>
          </div>
          <div className="up-img">
            {/* <Upload
              action="/thyroid/assaySheetUpload"
              listType="picture-card"
              fileList={filed}
              onChange={onChange}
              name="files"
              headers={'TOKEN:e0468b96-8675-47c0-bd08-8c817f4922c0' as any}
              onPreview={onPreview}
              beforeUpload={beforeUpload}
              customRequest={uploadInvoice}
            >
              {filed.length < 2}
            </Upload> */}
            <ImagePicker
              length="1"
              files={filed}
              onChange={onChange}
              onImageClick={(index, fs) => uploadInvoice(index, fs)}
              selectable={filed.length < 7}
              // multiple={this.state.multiple}
            />
            <div className="up-btn">
              <button
                className={`thyroid-gland-select-info-bottom ${
                  disabled ? 'disable' : ''
                }`}
                onClick={handleNext}
                disabled={!disabled}
              >
                提交报告
              </button>
              <button
                className="thyroid-gland-select-info-bottom"
                onClick={() => handwrite()}
              >
                没有报告，手动填写
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Report;
