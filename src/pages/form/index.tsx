import { Button, Form, Input, Modal, Row, Select, Space, Divider } from "antd";
import { useState } from "react";
import { addUser } from "../../api";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./index.css";
const itemLayout = {
  wrapperCol: {
    span: 24,
  },
};

const addForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  // 模态框显示
  const showModal = () => {
    setIsModalOpen(true);
  };
  //点击确认对表单数据进行提交
  const handleOk = async () => {
    try {
      // fieldsValue拿到用户输入的数据
      const fieldsValue = await form.validateFields();
      // console.log("1111", fieldsValue);
      // 调用接口进行提交
      const res = await addUser(fieldsValue);
      console.log("res", res.data);
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  // 取消
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        添加企业成员
      </Button>
      <Modal
        title="添加企业成员"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <span key="文本" className="text" style={{ color: "#b3b9c0" }}>
            系统会向该邮箱与手机号发送邀请邮件
          </span>,
          <div key="按钮">
            <Button onClick={handleCancel} type="text">
              取消
            </Button>
            <Button type="primary" onClick={handleOk}>
              确认
            </Button>
          </div>,
        ]}
      >
        <Divider />
        <Row style={{ marginBottom: "20px", fontSize: "16px" }}>成员信息</Row>
        <Form name="userForm" style={{ width: 700 }} form={form}>
          <Form.List name="users" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="start"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "userName"]}
                      {...itemLayout}
                      validateTrigger={["onBlur"]}
                      rules={[
                        {
                          required: true,
                          message: "请输入姓名",
                        },
                        {
                          pattern: /^[\u4e00-\u9fa5]{2,4}$/,
                          message: "请输入正确的名字",
                        },
                      ]}
                    >
                      <Input placeholder="姓名" size="large" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "email"]}
                      validateTrigger={["onBlur"]}
                      rules={[
                        {
                          required: true,
                          message: "邮箱不能为空",
                        },
                        {
                          pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                          message: "请输入正确的邮箱",
                        },
                      ]}
                    >
                      <Input placeholder="员工邮箱" size="large" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "phone"]}
                      validateTrigger={["onBlur"]}
                      rules={[
                        {
                          required: true,
                          message: "手机号不能为空",
                        },
                        {
                          pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                          message: "请输入正确的手机号",
                        },
                      ]}
                    >
                      <Input
                        placeholder="手机号"
                        addonBefore={
                          <Select
                            defaultValue="86"
                            style={{ width: 70 }}
                            options={[{ value: "+86" }, { value: "+87" }]}
                          />
                        }
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item className="icon" style={{ display: "flex" }}>
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className="circle"
                        style={{
                          color: "#ff7f79",
                          fontSize: "16px",
                          marginRight: "8px",
                        }}
                      />
                      <PlusCircleOutlined
                        onClick={() => add()}
                        className="plus"
                        style={{ color: "#32b0f6", fontSize: "16px" }}
                      />
                    </Form.Item>
                  </Space>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default addForm;
