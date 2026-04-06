import React from 'react';
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';
import './reset.css';
import DiscoverQueryBuilder from '../discover-query-builder.jsx';

createRoot(document.getElementById('root')).render(<DiscoverQueryBuilder />);
