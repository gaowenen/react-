import { useEffect, useState } from "react";
import { getUserList, delUser } from "../../api";
import { User } from "../../data";
import "./index.css";
// 引入组件
import { Col, Row, Card, Tag, Space, Empty } from "antd";
import {
  ShareAltOutlined,
  DownloadOutlined,
  EyeOutlined,
  CloseOutlined,
} from "@ant-design/icons";
// 接口类型
interface ThumbnailProps {
  image: string;
  alt: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ image, alt }) => {
  return (
    <div className="thumbnail">
      <img src={image} alt={alt} />
    </div>
  );
};
const List = () => {
  const [loading, setLoading] = useState(false);
  const [isHoverId, setIsHoverId] = useState(null);
  const [userList, setUserList] = useState<User[]>([]);
  // 获取到列表数据
  useEffect(() => {
     setLoading(true);
    const getList = async () => {
      const res = await getUserList();
      // console.log("res", res.data);
      setUserList(res.data);
      setLoading(false);
    };
    getList();
  }, []);
  const handleMouseEnter = (id: any) => {
    setIsHoverId(id);
  };
  const handleMouseLeave = () => {
    setIsHoverId(null);
  };
  const delUserItem = async (id: any) => {
    await delUser(id);
    setUserList(userList.filter((item) => item.id !== id));
    console.log("删除成功");
  };
  return (
    <div className="list">
      <Row gutter={24}>
        {userList.length ? (
          userList.map(
            ({
              id,
              user_name,
              goods_img,
              shareNum,
              downloadNum,
              eyeNum,
              picType,
              picSize,
            }) => {
              return (
                <Col span={3} key={id}>
                  <Card
                    hoverable
                    onMouseEnter={() => handleMouseEnter(id)}
                    onMouseLeave={() => handleMouseLeave()}
                    className="goods-item"
                    loading={loading}
                    cover={
                      <Thumbnail image={goods_img} alt={`Thumbnail ${id}`} />
                    }
                    extra={
                      <CloseOutlined
                        onClick={() => delUserItem(id)}
                        style={{
                          display: id === isHoverId ? "block" : "none",
                        }}
                      />
                    }
                  >
                    <div className="content">{user_name}</div>
                    <div className="icon—box">
                      <i className="icon first">
                        <ShareAltOutlined />
                        {shareNum}
                      </i>
                      <i className="icon">
                        <DownloadOutlined />
                        {downloadNum}
                      </i>
                      <i className="icon">
                        <EyeOutlined />
                        {eyeNum}
                      </i>
                    </div>
                    <div>
                      <Tag>{picType}</Tag>
                      <Tag>{picSize}MB</Tag>
                    </div>
                  </Card>
                </Col>
              );
            }
          )
        ) : (
            <Empty />
        )}
      </Row>
    </div>
  );
};
export default List;
