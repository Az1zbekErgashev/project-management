import React, { useEffect, useState } from "react";
import { Layout, Card, Statistic, Row, Col, Table, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;
const { Content } = Layout;

const HomePage: React.FC = () => {
  const [stats, setStats] = useState({ users: 0, requests: 0, logs: 0 });
  const [logs, setLogs] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch statistics
    axios.get("/api/user/filter").then((res) => setStats((prev) => ({ ...prev, users: res.data.total })));
    axios.get("/api/request/filter-values").then((res) => setStats((prev) => ({ ...prev, requests: res.data.total })));
    axios.get("/api/logs/filter").then((res) => setStats((prev) => ({ ...prev, logs: res.data.total })));

    axios.get("/api/logs/filter").then((res) => setLogs(res.data.logs));

    axios.get("/api/request/category").then((res) => {
      if (Array.isArray(res.data.categories)) {
        setCategories(res.data.categories.map((c: { categoryName: any; requestCount: any; }, i: any) => ({ key: i, name: c.categoryName, count: c.requestCount })));
      }
    });
  }, []);

  const logColumns = [
    { title: "User Email", dataIndex: "userEmail", key: "userEmail" },
    { title: "Action", dataIndex: "action", key: "action" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const categoryColumns = [
    { title: "Category Name", dataIndex: "name", key: "name" },
    { title: "Total Requests", dataIndex: "count", key: "count" },
  ];

  return (
    <Layout style={{ padding: "20px" }}>
      <Content>
        <Title level={2}>CRM Dashboard</Title>

        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic title="Total Users" value={stats.users} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Total Requests" value={stats.requests} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Total Logs" value={stats.logs} />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Card title="Request Categories">
              <Table dataSource={categories} columns={categoryColumns} pagination={false} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Recent Logs">
              <Table dataSource={logs} columns={logColumns} pagination={{ pageSize: 5 }} />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;
