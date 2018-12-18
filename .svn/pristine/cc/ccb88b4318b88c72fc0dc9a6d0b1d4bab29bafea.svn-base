drop table BosAuditBonus;

drop table BosBonusDate;

drop table BosBonusImpower;

drop table BosBonusItem;

drop table BosBonusItemData;

drop table BosBonusItemRule;

drop table BosBonusParam;

drop table BosBonusReson;

drop table BosGrendReson;

drop table BosSuggest;

drop table BosSuggestContent;

drop table SysAuthor;

drop table SysCompany;

drop table SysDepart;

drop table SysPosition;

drop table SysRole;

drop table SysRoleDetial;

drop table SysUser;

create table BosAuditBonus (
AuditBonusId         bigint                         not null,
GetOpenId            varchar(200),
GetBonusId           varchar(max),
GetMoney             decimal,
GetDate              datetime,
IsState              int,
ConfirmOpenId        varchar(200),
ConfirmDate          datetime,
IsDepOrEmp           int,
Remake               varchar(200),
CompanyId            nvarchar(50),
primary key (AuditBonusId)
);

create table BosBonusDate (
BdId                 bigint                         not null,
BonusItemId          nvarchar(200),
DisMan               varchar(200),
DisDate              datetime,
EarMan               varchar(200),
BonusMoney           decimail,
BonusType            int,
IsGet                int,
CompanyId            nvarchar(50),
ResonId              varchar(200),
primary key (BdId)
);

create table BosBonusImpower (
BiId                 int                            not null,
BonusItemId          nvarchar(200),
BItemUser            varchar(200),
BInpowerUser         varchar(200),
AddMoney             decimal,
RemainMoney          decimal,
InpowerDate          datetime,
endDate              datetime,
IsVaild              bit,
Modeal               bit,
Remake               varchar(200),
primary key (BiId)
);

create table BosBonusItem (
BonusItemId          nvarchar(200)                  not null,
BonusItemName        nvarchar(50),
IsActive             bit,
OpenId               varchar(200),
CompanyId            nvarchar(50),
BItemType            bit,
InDate               int,
DepId                int,
primary key (BonusItemId)
);

create table BosBonusItemData (
BDId                 int                            not null,
BonusItemId          nvarchar(200),
AddMoney             decimal,
RemainMoney          decimal,
AddDate              datetime,
endDate              datetime,
BdType               bit,
primary key (BDId)
);

create table BosBonusItemRule (
BRId                 int                            not null,
BRName               nvarchar(50),
RemainNum            int,
GainNum              int,
AvgMoney             decimal,
BonusItemId          nvarchar(200),
primary key (BRId)
);

create table BosBonusParam (
BonusParamId         bigint                         not null,
BPName               varchar(50),
BPMoney              decimal,
CompanyId            nvarchar(50),
primary key (BonusParamId)
);

create table BosBonusReson (
BrId                 varchar(200)                   not null,
BrContent            nvarchar(max),
BrType               int,
primary key (BrId)
);

create table BosGrendReson (
GrId                 bigint                         not null,
BrContent            nvarchar(max),
OpenId               varchar(200),
primary key (GrId)
);

create table BosSuggest (
SuggestId            bigint                         not null,
OpenId               varchar(200),
SuggestContentId     varchar(200),
lxType               varchar(50),
CommitDate           datetime,
CompanyId            nvarchar(50),
primary key (SuggestId)
);

create table BosSuggestContent (
ContentId            varchar(200)                   not null,
Contents             varchar(200),
CTypes               int,
primary key ()
);

create table SysAuthor (
AuthorId             int                            not null,
Pid                  int,
AuthorName           nvarchar(50),
AuthorUrl            nvarchar(200),
AuthorPhoto          nvarchar(200),
AuthorIndex          int,
IsActive             int,
primary key (AuthorId)
);

create table SysCompany (
CompanyId            nvarchar(50)                   not null,
CompanyName          nvarchar(200)                  not null,
OpenId               varchar(200),
ComPhoto             nvarchar(200),
RegTime              datetime,
EndTime              datetime,
UserCount            int,
IsTongguo            bit,
CompanyPhone         nvarchar(11),
CompanyEmail         nvarchar(50),
primary key (CompanyId)
);

create table SysDepart (
DepId                int                            not null,
DepName              nvarchar(50),
CompanyId            nvarchar(50),
OpenId               varchar(200),
Pid                  int,
SpellJp              nvarchar(50),
SpellQp              nvarchar(200),
primary key (DepId)
);

create table SysPosition (
PostId               int                            not null,
PostName             nvarchar(50),
CompanyId            nvarchar(50),
OpenId               varchar(200),
DepId                int,
Remake               nvarchar(50),
primary key (PostId)
);

create table SysRole (
RoleId               nvarchar(200)                  not null,
RoleName             nvarchar(50),
CompanyId            nvarchar(50),
IsActive             big,
primary key (RoleId)
);

create table SysRoleDetial (
RoleDetialId         bigint                         not null,
RoleId               nvarchar(200),
AuthorId             int,
primary key (RoleDetialId)
);

create table SysUser (
OpenId               varchar(200)                   not null,
UserId               varchar(50),
UserName             nvarchar(50)                   not null,
UserPwd              varchar(50)                    not null,
UserPhone            varchar(11),
Photo                nvarchar(200)                  not null,
Sex                  BIT,
Birth                datetime                       not null,
JoinDate             datetime,
IsOut                bit,
SpellJp              nvarchar(50),
SpellQp              nvarchar(100),
DepId                int,
PostId               int,
CompanyId            nvarchar(50),
RoleId               varchar(200),
primary key (OpenId)
);

