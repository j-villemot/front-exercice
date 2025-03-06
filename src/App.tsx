import { Input, Layout, Pagination, Select, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { ReactElement, useEffect, useState } from 'react'
import { getMovies } from './clients/MovieApiClient'
import { Content, Header } from 'antd/es/layout/layout'
import {debounce} from 'lodash';
import MovieInformation from './MovieInformation'
import MoviePlot from './MoviePlot'
import MoviePosterAndRating from './MoviePosterAndRating'
import MovieGenre from './MovieGenre'

function App(): ReactElement {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [filterSelectorValue, setFilterSelectorValue] = useState("title");
  const [filterTextValue, setFilterTextValue] = useState("");
  const LIMIT = 10;

  useEffect(() => {
    getMovies(LIMIT, page * LIMIT)
      .then((response) => {
          setMovies(response ? response.data.movies: []);
          setTotal(response ? response.data.total: 0);
          setPage(1);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  async function updatePaginatedContent(page: number): Promise<void> {
    setLoading(true);
    getMovies(LIMIT, (page - 1) * LIMIT, getSearchFilters())
      .then((response) => {
        setMovies(response ? response.data.movies: []);
        setTotal(response ? response.data.total: 0);
        setPage(page);
        window.scrollTo(0, 0);
      }).catch((e) => {
      console.error(e);
    }).finally(() => setLoading(false));
  }

  async function handleOnChangeFilterText(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const filterText = event.target.value;
    setFilterTextValue(filterText);
    setLoading(true);

    const searchFilter = filterSelectorValue && filterText ? `${filterSelectorValue}=${filterText}` : "";

    getMovies(LIMIT, (page - 1) * LIMIT, searchFilter)
      .then((response) => {
        setMovies(response ? response.data.movies: []);
        setTotal(response ? response.data.total: 0);
        setPage(1);
        window.scrollTo(0, 0);
      }).catch((e) => {
      console.error(e);
    }).finally(() => setLoading(false));
  }

  function getSearchFilters(): string {
    return filterSelectorValue && filterTextValue ? `${filterSelectorValue}=${filterTextValue}` : "";
  }

  const columns: ColumnsType = [
    {dataIndex: 'rating', key: 'rating', render: (_, record) => MoviePosterAndRating(record)},
    {dataIndex: 'title', key: 'title', render: (_, record) => (MovieInformation(record))},
    {dataIndex: 'plot', key: 'plot', render: plot => MoviePlot(plot)},
    {dataIndex: 'genres', key: 'genres', render: genres => MovieGenre(genres)},
  ];

  return (
    <>
      <Layout>
        <Header
         className="page-header"
        >
          <Typography.Title
            level={1}
            className="page-title">
              {`Drunken potatoes`}
          </Typography.Title>
          <Typography.Title
            level={3}
            className="page-title">
              {`Best ${filterSelectorValue === "genres" && filterTextValue ? filterTextValue.toLowerCase() : ''} movies ranked by rating`}
          </Typography.Title>
          <div className="search-area">
            <Typography.Title level={5} className="search-title">Filters</Typography.Title>
            <Select
              className='select-input'
              value={filterSelectorValue}
              onChange={setFilterSelectorValue}
            >
              <Select.Option value="title" >Title</Select.Option>
              <Select.Option value="director">Director</Select.Option>
              <Select.Option value="actors">Actor</Select.Option>
              <Select.Option value="year">Release date</Select.Option>
              <Select.Option value="genres">Genre</Select.Option>
            </Select>
            <Input placeholder="Search"
                   className="search-input"
                   allowClear
                   onChange={(debounce(handleOnChangeFilterText, 500))}
            />
          </div>
        </Header>
        <Content className="page-content">
          <Table
            rowKey={(record) => record.id}
            loading={loading}
            dataSource={movies}
            columns={columns}
            pagination={false}
            showHeader={false}
          />
          <div className="pagination-container">
            <Pagination
              current={page}
              defaultCurrent={0}
              pageSize={LIMIT}
              total={total}
              showSizeChanger={false}
              onChange={updatePaginatedContent}
            />
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default App

