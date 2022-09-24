import React from 'react';
import House from './library/house';
import AppLogo from './library/app-logo';
import Upload from './library/upload';
import Add from './library/add';
import Delete from './library/delete';
import Edit from './library/edit';
import Close from './library/close';
import Refresh from './library/refresh';
import Search from './library/search';
import Arrow from './library/arrow';
import Chevron from './library/chevron';
import Error from './library/error';
import Success from './library/success';
import Warning from './library/warning';
import Tag from './library/tag';

interface ComponentProps extends React.FC<React.ComponentProps<'div'>> {
  House: typeof House;
  AppLogo: typeof AppLogo;
  Upload: typeof Upload;
  Add: typeof Add;
  Delete: typeof Delete;
  Edit: typeof Edit;
  Close: typeof Close;
  Refresh: typeof Refresh;
  Search: typeof Search;
  Arrow: typeof Arrow;
  Chevron: typeof Chevron;
  Error: typeof Error;
  Success: typeof Success;
  Warning: typeof Warning;
  Tag: typeof Tag;
}

export const Icons: ComponentProps = () => {
  return null;
};

Icons.House = House;
Icons.AppLogo = AppLogo;
Icons.Upload = Upload;
Icons.Add = Add;
Icons.Delete = Delete;
Icons.Edit = Edit;
Icons.Close = Close;
Icons.Refresh = Refresh;
Icons.Search = Search;
Icons.Arrow = Arrow;
Icons.Chevron = Chevron;
Icons.Error = Error;
Icons.Success = Success;
Icons.Warning = Warning;
Icons.Tag = Tag;

Icons.displayName = 'Icons';

export default Icons;
