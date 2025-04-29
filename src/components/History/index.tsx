import { Avatar, Pagination, Timeline } from 'antd';
import { useComments } from 'hooks/useComments';
import { StyledHistorySection } from './style';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { routes } from 'config/config';

interface HistorySectionProps {
  requestId: string;
}

export function HistorySection({ requestId }: HistorySectionProps) {
  const { t } = useTranslation();
  const { history, setHistoryParams } = useComments(parseInt(requestId));

  const handlePaginationChange = (page: number, pageSize: number) => {
    setHistoryParams((res) => ({ ...res, pageIndex: page, pageSize: pageSize }));
  };
  return (
    <StyledHistorySection>
      <div className="history-section">
        <div className="timeline">
          {history?.items?.map((entry: any, index: number) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="user-info">
                    <div className={entry.user?.image ? '' : 'user-avatar'}>
                      {entry.user?.image?.path ? (
                        <Avatar size={48} src={routes.api.baseUrl + '/' + entry.user?.image?.path} />
                      ) : (
                        entry?.user?.name?.[0]
                      )}
                    </div>
                    <div className="user-details">
                      <span className="user-name">
                        {entry?.user?.name} {entry?.user?.surname}
                      </span>
                      <span className="timestamp">
                        {entry.createdAt && dayjs(entry.createdAt).format('YYYY.MM.DD HH:mm:ss')}
                      </span>
                    </div>
                  </div>
                  <div className="action-badge">{t(entry.type)}</div>
                </div>

                <div className="timeline-message">
                  <p>{t(entry.log)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="center">
          {history?.totalPages > 1 && (
            <Pagination
              total={history?.totalItems}
              pageSize={history?.itemsPerPage}
              onChange={handlePaginationChange}
              hideOnSinglePage={true}
              current={history?.PageIndex}
            />
          )}
        </div>
      </div>
    </StyledHistorySection>
  );
}
