import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { PagesList } from './pages/PagesList';
import { PageEditor } from './pages/PageEditor';
import { PagePreview } from './pages/PagePreview';
import { MediaLibrary } from './pages/MediaLibrary';
import { UsersPage } from './pages/UsersPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="pages/new" element={<PageEditor />} />
          <Route path="pages/edit/:id" element={<PageEditor />} />
          <Route path="pages/preview/:id" element={<PagePreview />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
