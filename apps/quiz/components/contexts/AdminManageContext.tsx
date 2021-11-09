import React, { useCallback, useContext, useState } from 'react';

type DisplayContentType =
  | 'QUESTION_LIST'
  | 'ADD_NEW_QUESTION'
  | 'ACTIVE_USER_LIST';

type Props = {
  displayContent: DisplayContentType;
  changeDisplayContent: (value: DisplayContentType) => void;
};

const AdminManageDisplayContentContext = React.createContext<Props>({
  displayContent: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeDisplayContent: () => {},
});

export const AdminManageDisplayContentProvider: React.FC = ({ children }) => {
  const [displayContent, setDisplayContent] =
    useState<DisplayContentType>('QUESTION_LIST');
  const changeDisplayContent = useCallback(
    (displayContent: DisplayContentType) => {
      console.log('displayContent', displayContent);
      setDisplayContent(displayContent);
    },
    []
  );

  return (
    <AdminManageDisplayContentContext.Provider
      value={{ displayContent, changeDisplayContent }}
    >
      {children}
    </AdminManageDisplayContentContext.Provider>
  );
};

export const useAdminManageDisplayContentContext = () =>
  useContext(AdminManageDisplayContentContext);
