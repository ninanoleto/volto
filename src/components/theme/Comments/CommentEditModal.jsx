/**
 * Comment edit modal.
 * @module components/theme/Comments/CommentEditModal
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';

import { updateComment } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components';

const messages = defineMessages({
  editComment: {
    id: 'Edit comment',
    defaultMessage: 'Edit comment',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  comment: {
    id: 'Comment',
    defaultMessage: 'Comment',
  },
});

/**
 * CommentEditModal functional component.
 * @function CommentEditModal
 * @param {Object} props Component properties
 * @returns {string} Markup for the component.
 */
const CommentEditModal = ({ id = '', text = '', open, onOk, onCancel }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const request = useSelector((state) => state.comments.update);

  useEffect(() => {
    if (request.loading === false && request.loaded === true) {
      onOk();
    }
  }, [request, onOk]);

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} data Form data
   * @returns {undefined}
   */
  const onSubmit = (data) => {
    dispatch(updateComment(id, data.text));
  };

  return (
    open && (
      <ModalForm
        open={open}
        onSubmit={onSubmit}
        onCancel={onCancel}
        formData={{ text }}
        title={intl.formatMessage(messages.editComment)}
        schema={{
          fieldsets: [
            {
              id: 'default',
              title: intl.formatMessage(messages.default),
              fields: ['text'],
            },
          ],
          properties: {
            text: {
              title: intl.formatMessage(messages.comment),
              type: 'string',
              description: '',
            },
          },
          required: ['text'],
        }}
      />
    )
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 */
CommentEditModal.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CommentEditModal;
