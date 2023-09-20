import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './paginas/auth/login';
import Create from './paginas/auth/create';
import Index from './paginas/index';
import TicketsAdmin from './paginas/tikets/TicketsAdmin';
import TicketsCrear from './paginas/tikets/TicketsCrear';
import TicketDetails from './paginas/tikets/TicketsDetails';
import TicketResponse from './paginas/tikets/TicketsResponse';
import TicketResponsesViewer from './paginas/tikets/TicketsVerRespuestas';
import ResponseDetails from './paginas/tikets/ResponseDetails';
import ResponsesViewer from './paginas/tikets/RespuestaListar';
import IndexC from './paginas/indexC';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/index" element={<Index />} />
          <Route path="/indexC" element={<IndexC />} />
          <Route path="/ticketsadmin" element={<TicketsAdmin />} />
          <Route path="/ticketscrear" element={<TicketsCrear />} />
          <Route path="/ticketsver/:ticketId" element={<TicketDetails />} />
          <Route path="/ticketsresponder/:ticketId" element={<TicketResponse />} />
          <Route path="/ticketsrespuesta" element={<TicketResponsesViewer />} />
          <Route path="/respuestaver" element={<ResponsesViewer/>} />
          <Route path="/respuestaver/:responseId" element={<ResponseDetails/>} />


          ResponsesViewer
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
