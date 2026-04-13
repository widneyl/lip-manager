import { useState } from "react";
import { Layout, Menu, Avatar, Typography, Button, Drawer } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

import TaskListView from "./TaskListView";
import { useTaskStore } from "../lib/taskStore";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const menuItems = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "tasks", icon: <UnorderedListOutlined />, label: "Tarefas" },
  { type: "divider" as const },
  { key: "logout", icon: <LogoutOutlined />, label: "Sair", danger: true },
];

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();
  const [isMobile] = useState(false);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
    } else { setCurrentPage(key); }
    if (isMobile)
      setDrawerOpen(false);
  };

  const siderMenu = (
    <Menu
      mode="inline"
      selectedKeys={[currentPage]}
      onClick={handleMenuClick}
      items={menuItems}
      style={{ borderRight: "none" }}
    />
  );

  const logo = (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <CheckSquareOutlined style={{ fontSize: 24, color: "#667eea" }} />
      {!collapsed && (
        <Text
          strong
          style={{
            marginLeft: 10,
            fontSize: 18,
          }}
        >
          TaskManager
        </Text>
      )}
    </div>
  );

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={240}
        styles={{ body: { padding: 0 } }}
      >
        {logo}
        {siderMenu}
      </Drawer>

      <Sider
        breakpoint="md"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        style={{ background: "#fff" }}
      >
        {logo}
        {siderMenu}
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />

          <Avatar icon={<UserOutlined />} style={{ background: "#667eea" }} />
        </Header>

        <Content style={{ padding: 16 }}>
            <TaskListView
              tasks={tasks}
              onAdd={addTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
        </Content>
      </Layout>
    </Layout>
  );
}
