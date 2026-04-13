import { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import type { Task } from "../lib/taskStore";

interface Props {
  open: boolean;
  task: Task | null;
  onSave: (values: Omit<Task, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export default function TaskFormModal({ open, task, onSave, onCancel }: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (task) {
        form.setFieldsValue({
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          dueDate: dayjs(task.dueDate),
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, task, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSave({
        title: values.title,
        description: values.description,
        priority: values.priority,
        status: values.status,
        dueDate: values.dueDate.toISOString(),
      });
      form.resetFields();
    });
  };

  return (
    <Modal
      title={task ? "Editar Tarefa" : "Nova Tarefa"}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Salvar"
      cancelText="Cancelar"
      okButtonProps={{
        style: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
        },
      }}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={{ priority: "media", status: "pendente" }}
        style={{ marginTop: 16 }}
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: "Informe o título" }]}
        >
          <Input placeholder="Ex: Finalizar relatório" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descrição"
          rules={[{ required: true, message: "Informe a descrição" }]}
        >
          <Input.TextArea rows={3} placeholder="Descreva a tarefa..." />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Prioridade"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "Alta", value: "alta" },
              { label: "Média", value: "media" },
              { label: "Baixa", value: "baixa" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "Pendente", value: "pendente" },
              { label: "Em Progresso", value: "em_progresso" },
              { label: "Concluída", value: "concluida" },
              { label: "Atrasada", value: "atrasada" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Data Limite"
          rules={[{ required: true, message: "Informe a data limite" }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
