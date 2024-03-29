﻿using KlimaOppgave.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KlimaOppgave.DAL
{
    public interface IBrukerRepository
    {
        Task<int> LagBruker(Bruker bruker);

        Task<int> LoggInn(Bruker bruker);
    }
}