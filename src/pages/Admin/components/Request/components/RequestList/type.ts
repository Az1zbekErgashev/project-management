export interface RequestModel {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  inquiryType?: string; // Тип запроса
  companyName?: string; // Название компании
  department?: string; // Ответственный отдел
  responsiblePerson?: string; // Имя ответственного
  inquiryField?: string; // Область запроса
  clientCompany?: string; // Компания клиента
  projectDetails?: string; // Описание проекта
  client?: string; // Клиент
  contactNumber?: string; // Контактный номер
  email?: string; // Электронная почта
  processingStatus?: { text: string; color: string }; // Статус обработки
  finalResult?: string; // Итоговый результат
  notes?: string; // Примечания (причина итогового результата)
  requestStatus?: RequestStatusModel | null;
  isDeleted: number;
  date: string | null;
  status: string | null;
  lastUpdate: string | null;
}

export interface RequestStatusModel {
  title: string;
  id: number;
}

export interface RequestItems {
  items: RequestModel[];
  pageIndex: number;
  itemsPerPage: number;
}
