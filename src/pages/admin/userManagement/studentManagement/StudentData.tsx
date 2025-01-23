import { Button, Pagination, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

import { useState } from 'react';
import { TQueryPram, TStudent } from '../../../../types';
import { useGetAllStudentsQuery } from '../../../../redux/features/admin/userManagement.api';
import { useNavigate } from 'react-router-dom';
import BlockPopup from '../../../../components/ui/BlockPopup';

export type TTableData = Pick<
  TStudent,
  'fullName' | 'id' | 'email' | 'contactNo'
>;

export default function StudentData() {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryPram[]>([]);
  const navigate = useNavigate();

  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: 'page', value: page },
    { name: 'sort', value: 'id' },
    ...params,
  ]);
  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(
    ({ _id, id, fullName, email, contactNo }) => ({
      key: _id,
      id,
      fullName,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'fullName',
    },
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'contactNo',
      title: 'Contact No',
      dataIndex: 'contactNo',
    },
    {
      key: 'action',
      title: 'Action',
      render: (item) => {
        return (
          <Space>
            <Button onClick={() => navigate(`/admin/student/${item.key}`)}>
              Details
            </Button>
            <Button
              onClick={() => navigate(`/admin/student/update/${item.key}`)}
            >
              Update
            </Button>
            <BlockPopup item={item} />
          </Space>
        );
      },
      width: '1%',
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    const queryParams: TQueryPram[] = [];
    if (extra.action === 'filter') {
      filters.name?.forEach((item) =>
        queryParams.push({ name: 'name', value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: 'year', value: item })
      );
    }
    setParams(queryParams);
  };

  return (
    <>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
}
