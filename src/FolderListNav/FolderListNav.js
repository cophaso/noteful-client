import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './FolderListNav.css';

const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folderId === folderId).length

class FolderListNav extends Component {
  static contextType = NotefulContext;

  render() {
  const { notes=[], folders=[] } = this.context
  return (
    <div className='FolderListNav'>
      <ul className='FolderListNav__list'>
        {folders.map(folder =>
          <li key={folder.id}>
            <NavLink to={`/folder/${folder.id}`} className='FolderListNav__folder-link'>
              <span className='FolderListNav__num-notes'>
                {countNotesForFolder(notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='FolderListNav__button-wrapper'>
        <NavLink
          to='/add-folder'
          type='button'
          className='FolderListNav__add-folder-button'
        >
          Add Folder
        </NavLink>
      </div>
    </div>
  )}
}

export default FolderListNav;
