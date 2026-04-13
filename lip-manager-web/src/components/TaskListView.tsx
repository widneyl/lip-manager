import { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Button,
  Space,
  Select,
  Input,
  Popconfirm,
  Empty,
  Typography,
  message,
  Card,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import TaskFormModal from "./TaskFormModal";
import type { Priority, Status, Task } from "../lib/taskStore";

const { Title, Text } = Typography;

const priorityColors: Record<Priority, string> = {
  alta: "red",
  media: "orange",
  baixa: "blue",
};

const priorityLabels: Record<Priority, string> = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
};

const statusColors: Record<Status, string> = {
  pendente: "gold",
  em_progresso: "processing",
  concluida: "success",
  atrasada: "error",
};

const statusLabels: Record<Status, string> = {
  pendente: "Pendente",
  em_progresso: "Em Progresso",
  concluida: "Concluída",
  atrasada: "Atrasada",
};

interface Props {
  tasks: Task[];
  onAdd: (task: Omit<Task, "id" | "createdAt">) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

function MobileTaskCard({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card
      size="small"
      style={{ marginBottom: 12, borderRadius: 10 }}
      styles={{ body: { padding: 14 } }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text strong style={{ fontSize: 15, display: "block", marginBottom: 4 }}>
            {task.title}
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {task.description.length > 80 ? task.description.slice(0, 80) + "..." : task.description}
          </Text>
        </div>
        <Space size={4}>
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => onEdit(task)} style={{ color: "#667eea" }} />
          <Popconfirm title="Excluir?" onConfirm={() => onDelete(task.id)} okText="Sim" cancelText="Não" okButtonProps={{ danger: true }}>
            <Button type="text" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
        <Tag color={priorityColors[task.priority]}>{priorityLabels[task.priority]}</Tag>
        <Tag color={statusColors[task.status]}>{statusLabels[task.status]}</Tag>
        <Text type="secondary" style={{ fontSize: 12, marginLeft: "auto" }}>
          {dayjs(task.dueDate).format("DD/MM/YYYY")}
        </Text>
      </div>
    </Card>
  );
}

export default function TaskListView({ tasks, onAdd, onUpdate, onDelete }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  const [filterPriority, setFilterPriority] = useState<string | undefined>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (searchText && !t.title.toLowerCase().includes(searchText.toLowerCase())) return false;
    if (filterStatus && t.status !== filterStatus) return false;
    if (filterPriority && t.priority !== filterPriority) return false;
    return true;
  });

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    message.success("Tarefa excluída com sucesso");
  };

  const handleSave = (values: Omit<Task, "id" | "createdAt">) => {
    if (editingTask) {
      onUpdate(editingTask.id, values);
      message.success("Tarefa atualizada");
    } else {
      onAdd(values);
      message.success("Tarefa criada");
    }
    setModalOpen(false);
    setEditingTask(null);
  };

  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
      sorter: (a: Task, b: Task) => a.title.localeCompare(b.title),
      render: (text: string, record: Task) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text}</div>
          <div style={{ fontSize: 12, color: "#8c8c8c", marginTop: 2 }}>
            {record.description.length > 60 ? record.description.slice(0, 60) + "..." : record.description}
          </div>
        </div>
      ),
    },
    {
      title: "Prioridade",
      dataIndex: "priority",
      key: "priority",
      width: 120,
      sorter: (a: Task, b: Task) => {
        const order = { alta: 0, media: 1, baixa: 2 };
        return order[a.priority] - order[b.priority];
      },
      render: (p: Priority) => <Tag color={priorityColors[p]}>{priorityLabels[p]}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (s: Status) => <Tag color={statusColors[s]}>{statusLabels[s]}</Tag>,
    },
    {
      title: "Data Limite",
      dataIndex: "dueDate",
      key: "dueDate",
      width: 130,
      sorter: (a: Task, b: Task) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),
      render: (d: string) => (
        <span style={{ color: dayjs(d).isBefore(dayjs()) ? "#ff4d4f" : undefined }}>
          {dayjs(d).format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Ações",
      key: "actions",
      width: 100,
      render: (_: unknown, record: Task) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ color: "#667eea" }} />
          <Popconfirm
            title="Excluir tarefa?"
            description="Essa ação não pode ser desfeita."
            onConfirm={() => handleDelete(record.id)}
            okText="Excluir"
            cancelText="Cancelar"
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Minhas Tarefas
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingTask(null);
            setModalOpen(true);
          }}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Nova Tarefa
        </Button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        <Input
          placeholder="Buscar tarefa..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: isMobile ? "100%" : 220, borderRadius: 8 }}
          allowClear
        />
        <Select
          placeholder="Status"
          allowClear
          value={filterStatus}
          onChange={setFilterStatus}
          style={{ width: isMobile ? "calc(50% - 4px)" : 150 }}
          options={[
            { label: "Pendente", value: "pendente" },
            { label: "Em Progresso", value: "em_progresso" },
            { label: "Concluída", value: "concluida" },
            { label: "Atrasada", value: "atrasada" },
          ]}
        />
        <Select
          placeholder="Prioridade"
          allowClear
          value={filterPriority}
          onChange={setFilterPriority}
          style={{ width: isMobile ? "calc(50% - 4px)" : 150 }}
          options={[
            { label: "Alta", value: "alta" },
            { label: "Média", value: "media" },
            { label: "Baixa", value: "baixa" },
          ]}
        />
      </div>

      {isMobile ? (
        filteredTasks.length === 0 ? (
          <Empty description="Nenhuma tarefa encontrada" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          filteredTasks.map((task) => (
            <MobileTaskCard key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        )
      ) : (
        <Table
          columns={columns}
          dataSource={filteredTasks}
          rowKey="id"
          pagination={{ pageSize: 8, showSizeChanger: false }}
          locale={{
            emptyText: <Empty description="Nenhuma tarefa encontrada" image={Empty.PRESENTED_IMAGE_SIMPLE} />,
          }}
          scroll={{ x: 700 }}
          style={{ borderRadius: 12, overflow: "hidden" }}
        />
      )}

      <TaskFormModal
        open={modalOpen}
        task={editingTask}
        onSave={handleSave}
        onCancel={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
      />
    </div>
  );
}
