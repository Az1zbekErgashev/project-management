import React from 'react';
import { StyledCreateIssueModal } from './style';
import { Button, Input, Select, SelectOption } from 'ui';
import { t } from 'i18next';

function CreateIssueModal() {
  const STATEPROPERTY = [
    { id: 0, text: 'Atmosphere' },
    { id: 1, text: 'Progress' },
    { id: 2, text: 'End' },
  ];

  return (
    <StyledCreateIssueModal>
      <div className="modal-content">
        <h1>{t('create_issue')}</h1>
        <div className="form-row">
          <Input name="projectDetails" label={t('project_details')} />
          <Select
            rules={[{ required: true, message: t('field_is_required') }]}
            label={t('priority')}
            name="priority"
          >
            {STATEPROPERTY.map((item: any) => (
              <SelectOption value={item.id} key={item.id}>
                {t(item.text)}
              </SelectOption>
            ))}
          </Select>
        </div>
        <div className="button-container">
          <Button
            className="save-button"
            type="primary"
            onClick={() => console.log('Save clicked')}
            label={t('save')}
          />
        </div>
      </div>
    </StyledCreateIssueModal>
  );
}

export default CreateIssueModal;